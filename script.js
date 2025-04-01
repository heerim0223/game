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

const character = {
    x: 15,
    y: 15,
    draw() {
        ctx.font = "30px Arial";
        ctx.fillText("\u{1F439}", this.x - 10, this.y + 20); // 나무 이모지
    },
    move(dx, dy) {
        // Calculate the potential new position
        const newX = this.x + dx * 50;
        const newY = this.y + dy * 50;

        // Convert the new position to map grid coordinates
        const gridX = Math.floor(newX / (canvas.width / 10));
        const gridY = Math.floor(newY / (canvas.height / 10));

        // Check if the new position is within bounds and the map value is 3 (path)
        if (gridX >= 0 && gridX < 10 && gridY >= 0 && gridY < 10 && map[gridY][gridX] === 3) {
            // If valid, update the character's position
            this.x = newX;
            this.y = newY;
        }
    }
};

const map = [
    [3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 1, 1, 1, 1, 1, 1, 3, 3],
    [1, 3, 1, 2, 1, 2, 1, 2, 1, 1],
    [1, 3, 1, 3, 1, 3, 1, 3, 1, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 3, 1, 1]
];

const stage = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    draw() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                switch (map[i][j]) {
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

// Handle keydown events (WASD keys)
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'w': // W 키 - 위로
            character.move(0, -1); // Move up
            break;
        case 's': // S 키 - 아래로
            character.move(0, 1); // Move down
            break;
        case 'a': // A 키 - 왼쪽으로
            character.move(-1, 0); // Move left
            break;
        case 'd': // D 키 - 오른쪽으로
            character.move(1, 0); // Move right
            break;
        default:
            break;
    }
    redraw(); // Redraw the canvas after moving the character
});

// Initial drawing
redraw();
