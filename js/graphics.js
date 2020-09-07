//set of functions used to draw world

function draw(tetris_world) {
    map = tetris_world.map;
    frame = "";
    for (row of map) {
        frame += "|";
        for (block of row) {
            frame += "<span style=\"color: " + block.color + "\">&#x25a0</span>";
        }
        frame += " | <br>";
    }
    frame += "<br>";
    frame += "<span class=\"badge badge-light\"> Score: " + tetris_world.score + "</span>"
    document.getElementById("game_1").innerHTML = frame;
}