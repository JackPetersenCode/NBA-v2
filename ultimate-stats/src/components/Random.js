/*import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";
*/


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

let array = [
    getRandomInt(1, 8),
    getRandomInt(1, 8),
    getRandomInt(1, 8),
    getRandomInt(1, 8),
    getRandomInt(1, 8),
    getRandomInt(1, 8),
    getRandomInt(1, 8),
    getRandomInt(1, 8),
    getRandomInt(1, 8),
    getRandomInt(1, 8)
]
console.log(array)    

let sumWithInitial = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
);

while (sumWithInitial !== 35) {
    let array = [
        getRandomInt(1, 8),
        getRandomInt(1, 8),
        getRandomInt(1, 8),
        getRandomInt(1, 8),
        getRandomInt(1, 8),
        getRandomInt(1, 8),
        getRandomInt(1, 8),
        getRandomInt(1, 8),
        getRandomInt(1, 8),
        getRandomInt(1, 8)
    ]
    sumWithInitial = array.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );
}
console.log(array)
console.log(sumWithInitial)
/*
if (sumWithInitial < 35) {
    let n = 0;
    let diff = 35 - sumWithInitial;

    while (sumWithInitial < 35) {
        let num = array[n]
        console.log(num)
        if (num === 7) {
            n++;
            if (n === 10) {
                n = 0;
            }
        } else {
            let newRandom = getRandomInt(1, 8);
            while (newRandom < num) {
                newRandom = getRandomInt(1, 8);
            }
            array[n] = newRandom;
            sumWithInitial = array.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
            );
            n++;

            if (sumWithInitial > 35) {
                let diff = sumWithInitial - 35;
                let x = 0;
                while (diff > 0) {
                    if (array[x] === 1) {
                        x++;
                    } else {
                        array[x] = array[x] - 1;
                        x++;
                        if (x === 10) {
                            x = 0;
                        }
                        diff--;
                    }
                }
            }
        }
    }
    sumWithInitial = array.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );
    console.log(sumWithInitial)
    console.log(array)
} else {
    let n = 0;
    while (sumWithInitial > 35) {
        let num = array[n];
        console.log(num)
        let newRandom = getRandomInt(1, 8);
        console.log(newRandom)
        while (newRandom > num) {
            newRandom = getRandomInt(1, 8);
        }
        array[n] = newRandom;
        console.log(array)
        n++;
        sumWithInitial = array.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
        console.log(sumWithInitial)
    }
    console.log(array)
} 
*/