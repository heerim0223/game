var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const background = {
    gridNumber: 10,
    draw() {
        ctx.beginPath();
        for (let index = 0; index <= this.gridNumber; index++) {
            ctx.moveTo(index * (canvas.height / this.gridNumber), 0);
            ctx.lineTo(index * (canvas.height / this.gridNumber), canvas.height);
            ctx.moveTo(0, index * (canvas.width / this.gridNumber));
            ctx.lineTo(canvas.width, index * (canvas.width / this.gridNumber));
        }
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
};


// Define multiple maps
const maps = [
    [
        [1, 1, 1, 1, 5, 3, 1, 1, 1, 1],
        [1, 7, 7, 1, 100, 100, 3, 3, 3, 1],
        [1, 7, 7, 1, 3, 3, 1, 1, 1, 1],
        [1, 7, 100, 1, 3, 3, 1, 2, 2, 1],
        [1, 1, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 1, 3, 3, 3, 3, 3, 3, 3, 5],
        [1, 1, 3, 3, 1, 1, 1, 1, 1, 1],
        [1, 1, 3, 3, 1, 7, 7, 7, 7, 1],
        [1, 1, 100, 100, 1, 7, 7, 7, 7, 1],
        [4, 1, 5, 3, 4, 4, 4, 4, 4, 4]
    ],
    [
        [1, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [1, 4, 4, 4, 4, 4, 4, 4, 4, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 5],
        [5, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 6, 6, 6, 6, 6, 6, 6, 6, 1],
        [1, 4, 4, 4, 4, 4, 4, 4, 4, 1],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    ],
    [
        [4, 4, 4, 6, 6, 6, 6, 4, 4, 4],
        [1, 4, 6, 8, 8, 8, 8, 6, 4, 1],
        [1, 6, 8, 8, 8, 8, 8, 8, 6, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [5, 3, 0, 1, 1, 1, 1, 0, 0, 100],
        [3, 0, 0, 1, 1, 1, 1, 0, 0, 100],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [1, 6, 8, 8, 8, 8, 8, 8, 6, 1],
        [1, 4, 6, 8, 8, 8, 8, 6, 4, 1],
        [4, 4, 4, 6, 6, 6, 6, 4, 4, 4],
    ]
];

// Initially set the map to the first map in the maps array
let map = maps[0];

const character = {
    x: 250 + 15,
    y: 200 + 15,
    draw() {
        ctx.font = "30px Arial";
        ctx.fillText("\u{1F439}", this.x - 10, this.y + 20);
    },
    move(dx, dy) {
        // Calculate the potential new position
        const newX = this.x + dx * 50;
        const newY = this.y + dy * 50;

        // Convert the new position to map grid coordinates
        const gridX = Math.floor(newX / (canvas.width / 10));
        const gridY = Math.floor(newY / (canvas.height / 10));

        // Check if the new position is within bounds and the map value is 3 (path)
        if (gridX >= 0 && gridX < 10 && gridY >= 0 && gridY < 10 && (map[gridY][gridX] === 0 || map[gridY][gridX] === 3 || map[gridY][gridX] === 5 || map[gridY][gridX] === 8)) {
            // If valid, update the character's position
            this.x = newX;
            this.y = newY;

            // Check if the character is on a "next map" (value 5) tile
            if (map == maps[0] && map[gridY][gridX] === 5 && gridX === 9 && gridY === 5) {
                // Change the map to the next map (swap map with the next one in the maps array)
                this.x = 0 + 15;
                this.y = 250 + 15;
                map = maps[1]; // Replace with the second map in the array
                redraw(); // Redraw the canvas after map change
            }

            if (map == maps[1] && map[gridY][gridX] === 5 && gridX === 0 && gridY === 5) {
                this.x = 450 + 15;
                this.y = 250 + 15;
                map = maps[0]; // Switch to the third map
                redraw(); // Redraw the canvas after map change
            }

            // When on map[1] and the character reaches the right side (gridX == 9) with a value of 5, switch to map[2]
            if (map == maps[1] && map[gridY][gridX] === 5 && gridX === 9 && gridY === 4) {
                this.x = 0 + 15;
                this.y = 200 + 15;
                map = maps[2]; // Switch to the third map
                redraw(); // Redraw the canvas after map change
            }

            if (map == maps[2] && map[gridY][gridX] === 5 && gridX === 0 && gridY === 4) {
                this.x = 450 + 15;
                this.y = 200 + 15;
                map = maps[1]; // Switch to the third map
                redraw(); // Redraw the canvas after map change
            }
        }
    }
};


const stage = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    draw() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                switch (map[i][j]) {
                    case 0: // tree
                        this.x = (canvas.width / 10) * j + 7;
                        this.y = (canvas.height / 10) * i + 35;
                        ctx.fillStyle = "#78be38";
                        ctx.fillRect(this.x - 7, this.y - 35, this.width, this.height);
                        break;
                    case 1: // tree
                        this.x = (canvas.width / 10) * j + 7;
                        this.y = (canvas.height / 10) * i + 35;
                        ctx.fillStyle = "#78be38";
                        ctx.fillRect(this.x - 7, this.y - 35, this.width, this.height);
                        ctx.font = "30px Arial";
                        ctx.fillText("\u{1F333}", this.x, this.y);
                        break;
                    case 2: // house
                        this.x = (canvas.width / 10) * j + 7;
                        this.y = (canvas.height / 10) * i + 35;
                        ctx.fillStyle = "#78be38";
                        ctx.fillRect(this.x - 7, this.y - 35, this.width, this.height);
                        ctx.font = "30px Arial";
                        ctx.fillText("\u{1F3E0}", this.x, this.y);
                        break;
                    case 3: // path
                        this.x = (canvas.width / 10) * j;
                        this.y = (canvas.height / 10) * i;
                        ctx.fillStyle = "gray";
                        ctx.fillRect(this.x, this.y, this.width, this.height);
                        break;
                    case 4: // sea
                        this.x = (canvas.width / 10) * j;
                        this.y = (canvas.height / 10) * i;
                        ctx.fillStyle = "#00bcf2";
                        ctx.fillRect(this.x, this.y, this.width, this.height);
                        break;
                    case 5: // next map
                        this.x = (canvas.width / 10) * j + 7;
                        this.y = (canvas.height / 10) * i + 35;
                        ctx.fillStyle = "gray";
                        ctx.fillRect(this.x - 7, this.y - 35, this.width, this.height);
                        ctx.font = "30px Arial";
                        ctx.fillText("\u{1F6A9}", this.x, this.y);
                        break;
                    case 6: // bridge
                        this.x = (canvas.width / 10) * j + 7;
                        this.y = (canvas.height / 10) * i + 35;
                        ctx.fillStyle = "#00bcf2";
                        ctx.fillRect(this.x - 7, this.y - 35, this.width, this.height);
                        ctx.font = "45px Arial";
                        ctx.fillText("\u{1F309}", this.x - 12, this.y);
                        break;
                        case 7: // sea
                            this.x = (canvas.width / 10) * j;
                            this.y = (canvas.height / 10) * i;
                            ctx.fillStyle = "#b67e36";
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case 8: // flower
                            this.x = (canvas.width / 10) * j + 7;
                            this.y = (canvas.height / 10) * i + 35;
                            ctx.fillStyle = "#78be38";
                            ctx.fillRect(this.x - 7, this.y - 35, this.width, this.height);
                            ctx.font = "30px Arial";
                            ctx.fillText("\u{1F33C}", this.x, this.y);
                            break;






                        case 100: // not yet
                            this.x = (canvas.width / 10) * j + 7;
                            this.y = (canvas.height / 10) * i + 35;
                            ctx.fillStyle = "#78be38";
                            ctx.fillRect(this.x - 7, this.y - 35, this.width, this.height);
                            ctx.font = "30px Arial";
                            ctx.fillText("\u{1F6A7}", this.x, this.y);
                            break;
                    default:
                        break;
                }
            }
        }
    }
};

function redraw() {
    // Clear the canvas and redraw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    stage.draw();
    character.draw();
}

const modal = document.querySelector('.modal');
const modalOpen = document.querySelector('.modal_btn');
const modalClose = document.querySelector('.close_btn');
let flag = false; // modal flag

// Handle keydown events (WASD keys)
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'w': // W
            character.move(0, -1); // Move up
            break;
        case 's': // S
            character.move(0, 1); // Move down
            break;
        case 'a': // A
            character.move(-1, 0); // Move left
            break;
        case 'd': // D
            character.move(1, 0); // Move right
            break;
		case 'e': // Menu
		case 'Escape':
			if(!flag) { // Open Menu
				modal.classList.add('on');
				flag = true;
			}
			else { // Close Menu
				modal.classList.remove('on');
				flag = false;
			}
        default:
            break;
    }
    redraw(); // Redraw the canvas after moving the character
});

// Initial drawing
redraw();