# Kingdom Defense
Kingdom Defense is a base defense action game where you take control of the playable character, who will be able to run, jump, and attack enemies on the field. You will have to fight back the invasion for as long as possible.

# [Live Link](http://juan-barba.me/KingdomDefense/)

# Wireframes
![WireFrame](https://user-images.githubusercontent.com/50244853/122831243-7389ab80-d29e-11eb-9853-1103b27cd1a5.png)

# Technologies

- Javascript
- HTML
- CSS

# Features

### Playable Character

 - The playable character was the most complex part of the project, but it started with creating a base class with features that I knew would be needed by other future classes. This would be called the `MovingObject` class.

```js
export default class MovingObject{
    constructor(x, y, width, height, color, game){
        this.game = game
        this.width = width;
        this.height = height;
        this.vel = {
            x: 0,
            y: 0
        }
        this.color = color
        this.pos ={
            x: x,
            y: y
        }
    }

    update(){
    }

    step(){
        this.update();
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}
```

- The `MovingObject` class creates a base structure that I could use for any other type of class that would be movable as well as some data needed for testing before sprites are added.
   - I later use this class as the base to be inherited by the `Monster` enemy class.
- The `Player` class then inherits from the `MovingObject` class and expands upon it features specific to that class.
- The `Player` class makes changes to the `update` function, previously empty in the `MovingObject` class, in order to handle updates created by user input.

```js
update() {
        let { upKey, leftKey, rightKey, attackKey } = this.game.keys; //downKey not used

        //Handle Horizontal Movement
        this.walk(leftKey, rightKey);
        //Handle Jump Movement
        this.jump(upKey);
        
        //Gravity
        this.vel.y <= this.maxFallSpeed ? this.vel.y += 2 : "";
        this.vel.x = Math.round(this.vel.x);
        this.vel.y = Math.round(this.vel.y);
        if (this.vel.y > 2) this.motion = "fall"
        //Handle Attack Activation
        this.attack(attackKey);
        //Update Player Sprite
        this.sprite.update(this.facing, this.motion);
    }
```
- The `update` function checks to see what keys are being pressed at a given time and sends them to their specific handler in order to change the state of the character at a given time. 
   - This function is also used to update the character based on gravity, as well as update the character sprite based on its current motion and facing direction.


# Timeline

- Create a movable character that can move left/right and jump (1 day)
- Create enemies that make some simple movements (1 day)
- Give playable character weapon/abilities that can destroy enemies (1 day)
- Create the game loop(1-2 day)

# Future Additions
- Add more enemy varieties
- Add powerups

