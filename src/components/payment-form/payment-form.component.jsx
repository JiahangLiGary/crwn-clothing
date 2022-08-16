import { useState } from "react";
import "./payment.styles.scss";
import { async } from "@firebase/util";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import Button from "../button/button.component";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.style";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const PaymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());
    const client_secret = response.paymentIntent.client_secret;
    console.log(client_secret);
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    setIsProcessingPayment(false);
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status == "succeeded") {
        alert("Payment successful");
      }
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={PaymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement></CardElement>
        <div className="payment">
          <Button disabled={isProcessingPayment} buttonType="inverted">
            Pay now
          </Button>
        </div>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
