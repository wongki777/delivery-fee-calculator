import React, { useState } from 'react';

export default function DeliveryCalculator() {
    const [input, setCartInput] = useState({
        cartValue: 0,
        deliveryDistance: 0,
        numberOfItems: 0,
        orderTime: ''
    });

    const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCartInput({ ...input, [event.target.name]: event.target.value });
    }

    const calculateFee = (index: any) => {
        let fee = 0;
        // If the cart value is less than 10€, a small order surcharge is added to the delivery price.
        // The surcharge is the difference between the cart value and 10€.
        if (input.cartValue < 10) {
            fee = 10 - input.cartValue;
        }

        // A delivery fee for the first 1000 meters (=1km) is 2€.
        // If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination.
        // Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
        let distancePer500m = Math.ceil(input.deliveryDistance / 500); // rounding up
        if (distancePer500m > 2) { // If distance is greater than 1000m
            fee = ((1 * distancePer500m) - 2) + 2;
        }
        else {
            fee = fee + 2; // minumum fee
        }

        // If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item.
        let quantityFee = 0;
        if (input.numberOfItems >= 5) {
            for (let x = 0; x < (input.numberOfItems - 4); x++) {
                quantityFee = quantityFee + 0.5;
            }
        }
        if (input.numberOfItems > 12) { // An extra "bulk" fee applies for more than 12 items of 1,20€
            quantityFee = quantityFee + 1.2;
        }
        fee = quantityFee + fee;

        // Rush time calculation
        let date = new Date(input.orderTime);
        let day = date.getDay();
        let rushTime = date.getHours();

        if (day === 5) { // day 5 equals to Friday
            if (rushTime >= 15 && rushTime <= 19) { // Friday rush timing is between 3 - 7 PM.
                fee = fee * 1.2; //the total delivery fee including possible surcharges multiplied by 1.2x.
            }
        }

        // The delivery fee can never be more than 15€, including possible surcharges.
        if (fee > 15) {
            fee = 15;
        }

        // The delivery is free (0€) when the cart value is equal or more than 200€.
        if (input.cartValue >= 200) {
            fee = 0;
        }
        document.getElementById("finalOutput")!.innerHTML = 'Delivery Price: €' + fee.toFixed(2);

    }

    return (
        <div id="container">
            <div id="grid">
                <div id="header">
                <h2>Delivery Fee Calculator</h2>
                </div>

                <div id="label-value">
                    <label htmlFor="cartValueInputBox">Cart Value:</label>
                </div>

                <div id="input-value">
                    <input
                    type="number"
                    id="cartValue"
                    placeholder="€"
                    name="cartValue"
                    value={input.cartValue}
                    onChange={inputChanged}
                    />
                </div>

                <div id="label-distance">
                    <label htmlFor="deliveryDistanceInputBox">Delivery distance:</label>
                </div>

                <div id="input-distance">
                    <input
                    type="number"
                    id="deliveryDistance"
                    placeholder="m"
                    name="deliveryDistance"
                    value={input.deliveryDistance}
                    onChange={inputChanged}
                    />
                </div>

                <div id="label-quantity">
                    <label
                    htmlFor="quantityInputBox">Amount of items:
                    </label>
                </div>

                <div id="input-quantity">
                    <input
                    type="number"
                    id="numberOfItems"
                    placeholder="quantity"
                    name="numberOfItems"
                    value={input.numberOfItems}
                    onChange={inputChanged}
                    />
                </div>

                <div id="label-time">
                    <label
                    htmlFor="time">Time:
                    </label>
                </div>

                <div id="input-time">
                    <input
                    type="datetime-local"
                    id="orderTime"
                    name="orderTime"
                    value={input.orderTime}
                    onChange={inputChanged}
                    />
                </div>

                <div id="calculate-button">
                    <button onClick={calculateFee} id="button">Calculate delivery price</button>
                </div>

                <div id="price-output">
                    <p id="finalOutput">Delivery price: €</p>
                </div>

            </div>
        </div>
    );
}
