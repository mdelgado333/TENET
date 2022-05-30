# TENET 2D PLATFORMING SHOOTER
    
#### Table of Contents
1. [Introduction](#introduction)
2. [Main Approach](#main-approach)
3. [Problems Faced](#problems-faced)
4. [Solutions](#solutions)
5. [Playing Instructions](#playing-instructions)

## Introduction

This project was developed by Alejandro Mazas, Cristian Calderón and Miguel Delgado in 7 days during the last week of the first module at Ironhack's Web Development bootcamp.
The task was to create a game using canvas and we came up with the idea of making a 2D platforming shooter with a little spin-off, implementing TENET's time reversing concept!

## Main Approach

At first, we wanted to create TENET doors to ressemble exactly the concept displayed in the movie and different levels once you reached the finish line, creating more platforms per level and increasing the number of enemies as well as the bullet rate.

## Major Problem

We came up with a huge problem that made us reduce the number of implementations we wanted to put in the game.
Platforms supposed a major setback in our project, making us lose a lot of time due to the fact that the collisions condition did not work quite well when several platforms were on top of each other.

## Solutions

* Platforms made sense after a couple of days.
* We came up with the idea that the direction in which the player moved was the direction the bullet would follow, making the player.control the time of the bullet, It isn't the full TENET concept but it quite ressembles the concept of time control.
* We decided only making one level were the shooting rate is random so that it is really hard at first.

## Playing Instructions

* W - jump
* S - shoot
* A - move left
* D - move right

The hero has 5 lives and the enemies only one. You win by killing them all.
Enemies will shoot you only when they start seeing you.
Hope you have fun playing it as much as we had making it!
