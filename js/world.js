class TetrisWorld {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.logical_map = [];
        this.falling_objects = [];
        this.debug_just_once - true;
        this.last_tick = Date.now();
        this.game_speed = 400;
        this.time_of_last_rotate = Date.now();

        this.rotation_vectors = {
            line: {
                first: {
                    0: { x: 1, y: -2 },
                    1: { x: 0, y: 0 },
                    2: { x: -1, y: -1 },
                    3: { x: -2, y: 1 }
                },

            },
            t_shaped: {
                first: {
                    0: { x: 1, y: 1 },
                    1: { x: 1, y: (-1) },
                    2: { x: 0, y: 0 },
                    3: { x: (-1), y: 1 },
                },
                second: {
                    0: { x: -1, y: 1 },
                    1: { x: 1, y: 1 },
                    2: { x: 0, y: 0 },
                    3: { x: -1, y: -1 },
                },
                third: {
                    0: { x: 0, y: 0 },
                    1: { x: -1, y: -1 },
                    2: { x: 0, y: 0 },
                    3: { x: 0, y: 0 },
                },
                forth: {
                    0: { x: 1, y: -1 },
                    1: { x: 0, y: 0 },
                    2: { x: 0, y: 0 },
                    3: { x: 0, y: 0 },
                }
            }
        };


        for (var i = 0; i < height; i++) {
            this.logical_map.push([]);
            for (var j = 0; j < width; j++) {
                this.logical_map[this.logical_map.length - 1].push({ color: "white", state: "blank", whole: [], inter: 0.0 });
            }
        }
    }
    get map() {
        return this.logical_map;
    }

    place_block_onto_map(obj) {
        for (const el of obj) {
            if (this.logical_map[el.y][el.x].state != "blank") {
                console.log("game over kinda not")
            } else {
                this.logical_map[el.y][el.x].state = el.state;
                this.logical_map[el.y][el.x].color = el.color;
            }
        }
    }

    new_falling_block() {


        var colors = ["red", "orange", "blue", "yellow", "pink", "purple"];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        var shapes = ["square", "t_shaped", "snake", "left_snake", "line", "left_L", "right_L", ];

        //var random_shape = shapes[Math.floor(Math.random() * shapes.length)];
        var random_shape = "left_L";


        if (random_shape == 'square') {
            var partblock_1 = { color: random_color, state: "moving down", x: 5, y: 0, };
            var partblock_2 = { color: random_color, state: "moving down", x: 6, y: 0 };
            var partblock_3 = { color: random_color, state: "moving down", x: 5, y: 1 };
            var partblock_4 = { color: random_color, state: "moving down", x: 6, y: 1 };
            var object_whole = { rotation: 0, name: "square", list: [partblock_1, partblock_2, partblock_3, partblock_4] };

            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole.list);
        } else if (random_shape == "t_shaped") {

            var partblock_1 = { color: random_color, state: "moving down", x: 5, y: 0 };
            var partblock_2 = { color: random_color, state: "moving down", x: 4, y: 1 };
            var partblock_3 = { color: random_color, state: "moving down", x: 5, y: 1 };
            var partblock_4 = { color: random_color, state: "moving down", x: 6, y: 1 };
            var object_whole = { rotation: 0, name: "t_shaped", list: [partblock_1, partblock_2, partblock_3, partblock_4] };

            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole.list);
        } else if (random_shape == "line") {

            var partblock_1 = { color: random_color, state: "moving down", x: 5, y: 0 };
            var partblock_2 = { color: random_color, state: "moving down", x: 6, y: 0 };
            var partblock_3 = { color: random_color, state: "moving down", x: 7, y: 0 };
            var partblock_4 = { color: random_color, state: "moving down", x: 8, y: 0 };
            var object_whole = { rotation: 0, name: "line", list: [partblock_1, partblock_2, partblock_3, partblock_4] };
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole.list);
        } else if (random_shape == "left_L") {

            var partblock_1 = { color: random_color, state: "moving down", x: 5, y: 0 };
            var partblock_2 = { color: random_color, state: "moving down", x: 5, y: 1 };
            var partblock_3 = { color: random_color, state: "moving down", x: 6, y: 1 };
            var partblock_4 = { color: random_color, state: "moving down", x: 7, y: 1 };
            var object_whole = { rotation: 0, name: "left_L", list: [partblock_1, partblock_2, partblock_3, partblock_4] };

            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole.list);
        } else if (random_shape == "right_L") {

            var partblock_1 = { color: random_color, state: "moving down", x: 5, y: 0 };
            var partblock_2 = { color: random_color, state: "moving down", x: 5, y: 1 };
            var partblock_3 = { color: random_color, state: "moving down", x: 4, y: 1 };
            var partblock_4 = { color: random_color, state: "moving down", x: 3, y: 1 };
            var object_whole = { rotation: 0, name: "right_L", list: [partblock_1, partblock_2, partblock_3, partblock_4] };
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole.list);
        } else if (random_shape == "snake") {

            var partblock_1 = { color: random_color, state: "moving down", x: 5, y: 0 };
            var partblock_2 = { color: random_color, state: "moving down", x: 4, y: 0 };
            var partblock_3 = { color: random_color, state: "moving down", x: 4, y: 1 };
            var partblock_4 = { color: random_color, state: "moving down", x: 3, y: 1 };
            var object_whole = { rotation: 0, name: "snake", list: [partblock_1, partblock_2, partblock_3, partblock_4] };
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole.list);
        } else if (random_shape == "left_snake") {

            var partblock_1 = { color: random_color, state: "moving down", x: 5, y: 0 };
            var partblock_2 = { color: random_color, state: "moving down", x: 6, y: 0 };
            var partblock_3 = { color: random_color, state: "moving down", x: 6, y: 1 };
            var partblock_4 = { color: random_color, state: "moving down", x: 7, y: 1 };
            var object_whole = { rotation: 0, shape: "left_snake", list: [partblock_1, partblock_2, partblock_3, partblock_4] };
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole.list);
        }
    }



    set_element(x, y, data) {
        //todo is possible?
        this.logical_map[y][x] = data;
    }

    is_part_of_whole(part, whole) {
        //console.log(part, whole);
        for (const el of whole) {
            //console.log(el, part);
            if (el.x == part.x && el.y == part.y) {
                return true;
            }
        }
        return false;

    }

    can_move_down(obj) {

        for (const part of obj) {
            if (this.height == part.y + 1) {
                return false;
            }
            if (part.state == "moving down" && (this.logical_map[part.y + 1][part.x].state != "blank" && !this.is_part_of_whole({ x: part.x, y: part.y + 1 }, obj))) {
                return false;
            }
        }
        return true;
    }


    can_move_left(obj) {
        for (const part of obj) {
            if (part.x - 1 < 0) {
                return false;
            }
            if (this.logical_map[part.y][part.x - 1].state != "blank" && !this.is_part_of_whole({ x: part.x - 1, y: part.y }, obj)) {
                return false;
            }
        }
        return true;
    }
    can_move_right(obj) {
        for (const part of obj) {
            if (part.state == "steady") {
                return false;
            }
            if (part.x + 1 >= this.width) {
                return false;
            }
            if (this.logical_map[part.y][part.x + 1].state != "blank" && !this.is_part_of_whole({ x: part.x + 1, y: part.y }, obj)) {
                return false;
            }

        }
        return true;
    }

    move_left() {
        var falling_object = this.falling_objects[this.falling_objects.length - 1].list;
        if (!this.can_move_left(falling_object)) {
            return;
        }
        for (var part of falling_object) {
            this.logical_map[part.y][part.x].state = "blank";
            this.logical_map[part.y][part.x].color = "white";
            part.x -= 1;
        }
        for (var part of falling_object) {
            this.logical_map[part.y][part.x].state = part.state;
            this.logical_map[part.y][part.x].color = part.color;
        }
    }
    move_right() {
        var falling_object = this.falling_objects[this.falling_objects.length - 1].list;


        if (!this.can_move_right(falling_object)) {
            return;
        }
        for (var part of falling_object) {
            this.logical_map[part.y][part.x].state = "blank";
            this.logical_map[part.y][part.x].color = "white";

            part.x += 1;
        }
        for (var part of falling_object) {
            this.logical_map[part.y][part.x].state = part.state;
            this.logical_map[part.y][part.x].color = part.color;
        }
    }


    tick() {



        var falling_object = this.falling_objects[this.falling_objects.length - 1].list;
        var falling_object_whole = this.falling_objects[this.falling_objects.length - 1];
        //console.log(falling_object);
        if (KEYS["ArrowLeft"]) {
            this.move_left();
        }
        if (KEYS["KeyR"] && Date.now() - this.time_of_last_rotate > 150) {
            this.time_of_last_rotate = Date.now();
            this.rotate(falling_object_whole);
        }


        if (KEYS["ArrowRight"]) {
            this.move_right();
        }
        if (KEYS["Space"]) {
            console.log("space");
            this.game_speed = 50;
        } else {
            this.game_speed = 150;
        }

        if (Date.now() - this.last_tick < this.game_speed) {
            return;
        } else {
            this.last_tick = Date.now();
        }

        if (this.can_move_down(falling_object)) {
            for (part of falling_object) {
                this.logical_map[part.y][part.x].state = "blank";
                this.logical_map[part.y][part.x].color = "white";

                part.y += 1;
            }
            this.place_block_onto_map(falling_object);
        } else {
            for (var part of falling_object) {
                part.state = "steady";
            }
            this.new_falling_block();
        }
    }

    rotate_line(block) {
        console.log("rotate line");
        console.log(block);
        if (block.rotation == 0) {
            for (var i = 0; i < block.list.length; i++) {

                var rotation_vec = this.rotation_vectors.line.first[i];

                this.logical_map[block.list[i].y][block.list[i].x].color = "white";
                this.logical_map[block.list[i].y][block.list[i].x].state = "blank";

                block.list[i].x += rotation_vec.x;
                block.list[i].y += rotation_vec.y;

            }
            block.rotation = 1;
        } else if (block.rotation == 1) {
            for (var i = 0; i < block.list.length; i++) {

                var rotation_vec = this.rotation_vectors.line.first[i];

                this.logical_map[block.list[i].y][block.list[i].x].color = "white";
                this.logical_map[block.list[i].y][block.list[i].x].state = "blank";

                block.list[i].x += -rotation_vec.x;
                block.list[i].y += -rotation_vec.y;

            }
            block.rotation = 0;
        }
    }
    rotate_t_shaped(block) {
        console.log(block);
        if (block.rotation == 0) {
            for (var i = 0; i < block.list.length; i++) {

                var rotation_vec = this.rotation_vectors.t_shaped.first[i];

                this.logical_map[block.list[i].y][block.list[i].x].color = "white";
                this.logical_map[block.list[i].y][block.list[i].x].state = "blank";

                block.list[i].x += rotation_vec.x;
                block.list[i].y += rotation_vec.y;

            }
            block.rotation = 1;
        } else if (block.rotation == 1) {
            for (var i = 0; i < block.list.length; i++) {

                var rotation_vec = this.rotation_vectors.t_shaped.second[i];

                this.logical_map[block.list[i].y][block.list[i].x].color = "white";
                this.logical_map[block.list[i].y][block.list[i].x].state = "blank";

                block.list[i].x += rotation_vec.x;
                block.list[i].y += rotation_vec.y;

            }
            block.rotation = 2;
        } else if (block.rotation == 2) {
            for (var i = 0; i < block.list.length; i++) {

                var rotation_vec = this.rotation_vectors.t_shaped.third[i];

                this.logical_map[block.list[i].y][block.list[i].x].color = "white";
                this.logical_map[block.list[i].y][block.list[i].x].state = "blank";

                block.list[i].x += rotation_vec.x;
                block.list[i].y += rotation_vec.y;

            }
            block.rotation = 3;
        } else if (block.rotation == 3) {
            for (var i = 0; i < block.list.length; i++) {

                var rotation_vec = this.rotation_vectors.t_shaped.forth[i];

                this.logical_map[block.list[i].y][block.list[i].x].color = "white";
                this.logical_map[block.list[i].y][block.list[i].x].state = "blank";

                block.list[i].x += rotation_vec.x;
                block.list[i].y += rotation_vec.y;

            }
            //restore to orginal order
            var p0 = block.list[0];
            var p1 = block.list[1];
            var p2 = block.list[2];
            var p3 = block.list[3];

            block.list = [p1, p3, p2, p0];

            block.rotation = 0;
        }
        console.log(block);
    }

    rotate(block) {
        console.log("rotate");
        if (block.name == "line") this.rotate_line(block);
        if (block.name == "t_shaped") this.rotate_t_shaped(block);
    }

}