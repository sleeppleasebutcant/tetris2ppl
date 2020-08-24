class TetrisWorld
{
    constructor(width, height)
    {       
        this.width = width;
        this.height = height;
        this.logical_map = [];
        this.falling_objects = [];
        this.debug_just_once - true;
        this.last_tick = Date.now();
        this.game_speed = 400;
        for(var i=0; i<height;i++)
        {
            this.logical_map.push([]);
            for(var j=0; j<width; j++)
            {
                this.logical_map[this.logical_map.length-1].push({color:"white", state: "blank", whole: [], inter: 0.0});
            }
        }
    }
    get map()
    {
        return this.logical_map;
    }

    place_block_onto_map(obj)
    {
        for(const el of obj)
        {
            if(this.logical_map[el.y][el.x].state!="blank")
            {
                console.log("game over kinda not")
            } 
            else
            {
                this.logical_map[el.y][el.x].state=el.state;
                this.logical_map[el.y][el.x].color=el.color;
            }
        }
    }

    new_falling_block()
    {
 

        var colors = ["red", "orange", "blue", "yellow", "pink", "purple"];
        var random_color = colors[Math.floor(Math.random()*colors.length)];
        var shapes = ["square", "t_shaped","snake", "left_snake", "line", "left_L", "right_L",];
        var random_shape = shapes[Math.floor(Math.random()*shapes.length)];


        if(random_shape=='square')
        {
            var partblock_1 = {color:random_color, state:"moving down", x: 5, y: 0};
            var partblock_2 = {color:random_color, state:"moving down", x: 6, y: 0};
            var partblock_3 = {color:random_color, state:"moving down", x: 5, y: 1};
            var partblock_4 = {color:random_color, state:"moving down", x: 6, y: 1};
            var object_whole = [partblock_1, partblock_2, partblock_3, partblock_4];
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole);
        }
        else if(random_shape=="t_shaped")
        {

            var partblock_1 = {color:random_color, state:"moving down", x: 5, y: 0};
            var partblock_2 = {color:random_color, state:"moving down", x: 5, y: 1};
            var partblock_3 = {color:random_color, state:"moving down", x: 4, y: 1};
            var partblock_4 = {color:random_color, state:"moving down", x: 6, y: 1};
            var object_whole = [partblock_1, partblock_2, partblock_3, partblock_4];
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole);
        }
        else if(random_shape=="line")
        {

            var partblock_1 = {color:random_color, state:"moving down", x: 5, y: 0};
            var partblock_2 = {color:random_color, state:"moving down", x: 6, y: 0};
            var partblock_3 = {color:random_color, state:"moving down", x: 7, y: 0};
            var partblock_4 = {color:random_color, state:"moving down", x: 8, y: 0};
            var object_whole = [partblock_1, partblock_2, partblock_3, partblock_4];
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole);
        }
        else if(random_shape=="left_L")
        {

            var partblock_1 = {color:random_color, state:"moving down", x: 5, y: 0};
            var partblock_2 = {color:random_color, state:"moving down", x: 5, y: 1};
            var partblock_3 = {color:random_color, state:"moving down", x: 6, y: 1};
            var partblock_4 = {color:random_color, state:"moving down", x: 7, y: 1};
            var object_whole = [partblock_1, partblock_2, partblock_3, partblock_4];
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole);
        }
        else if(random_shape=="right_L")
        {

            var partblock_1 = {color:random_color, state:"moving down", x: 5, y: 0};
            var partblock_2 = {color:random_color, state:"moving down", x: 5, y: 1};
            var partblock_3 = {color:random_color, state:"moving down", x: 4, y: 1};
            var partblock_4 = {color:random_color, state:"moving down", x: 3, y: 1};
            var object_whole = [partblock_1, partblock_2, partblock_3, partblock_4];
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole);
        }
        else if(random_shape=="snake")
        {

            var partblock_1 = {color:random_color, state:"moving down", x: 5, y: 0};
            var partblock_2 = {color:random_color, state:"moving down", x: 4, y: 0};
            var partblock_3 = {color:random_color, state:"moving down", x: 4, y: 1};
            var partblock_4 = {color:random_color, state:"moving down", x: 3, y: 1};
            var object_whole = [partblock_1, partblock_2, partblock_3, partblock_4];
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole);
        }
        else if(random_shape=="left_snake")
        {

            var partblock_1 = {color:random_color, state:"moving down", x: 5, y: 0};
            var partblock_2 = {color:random_color, state:"moving down", x: 6, y: 0};
            var partblock_3 = {color:random_color, state:"moving down", x: 6, y: 1};
            var partblock_4 = {color:random_color, state:"moving down", x: 7, y: 1};
            var object_whole = [partblock_1, partblock_2, partblock_3, partblock_4];
            this.falling_objects.push(object_whole);
            this.place_block_onto_map(object_whole);
        }
    }


    set_element(x, y, data)
    {
        //todo is possible?
        this.logical_map[y][x] = data;       
    }

    is_part_of_whole(part, whole)
    {
        //console.log(part, whole);
        for(const el of whole)
        {
            //console.log(el, part);
            if(el.x==part.x && el.y==part.y)
            {
                return true;
            }
        }
        return false;

    }

    can_move_down(obj)
    {
        
        for(const part of obj)
        {
            if(this.height == part.y+1)
            {
                return false;
            }
            if(part.state=="moving down" && (this.logical_map[part.y+1][part.x].state!="blank" && !this.is_part_of_whole({x: part.x, y: part.y+1}, obj)))
            {
                console.log(this.height-1 == part.y+1, this.is_part_of_whole({x: part.x, y: part.y+1}, obj));
                return false;
            }   
        }
        return true;
    }


    can_move_left(obj)
    {
        for(const part of obj)
        {
            if(part.x-1 < 0) 
            {
                return false;
            }
            if(this.logical_map[part.y][part.x-1].state!="blank" && !this.is_part_of_whole({x: part.x-1, y:part.y}, obj))
            {
                return false;
            }
        }
        return true;
    }
    can_move_right(obj)
    {
        for(const part of obj)
        {   
            if(part.state == "steady")
            {
                return false;
            }
            if(part.x+1>= this.width) 
            {
                return false;
            }
            if(this.logical_map[part.y][part.x+1].state!="blank" && !this.is_part_of_whole({x:part.x+1, y:part.y}, obj))
            {
                return false;
            }
            
        }
        return true;
    }

    move_left()
    {
        var falling_object = this.falling_objects[this.falling_objects.length-1];
        if(!this.can_move_left(falling_object)) 
        {
            return;
        }
        for(var part of falling_object)
        {
            this.logical_map[part.y][part.x].state="blank";
            this.logical_map[part.y][part.x].color="white";
            part.x-=1;
        }
        for(var part of falling_object)
        {
            this.logical_map[part.y][part.x].state=part.state;
            this.logical_map[part.y][part.x].color=part.color;
        }
    }
    move_right()
    {
        var falling_object = this.falling_objects[this.falling_objects.length-1];
        
        
        if(!this.can_move_right(falling_object)) 
        {
            return;
        }
        for(var part of falling_object)
        {
            this.logical_map[part.y][part.x].state="blank";
            this.logical_map[part.y][part.x].color="white";

            part.x+=1;
        }
        for(var part of falling_object)
        {
            this.logical_map[part.y][part.x].state=part.state;
            this.logical_map[part.y][part.x].color=part.color;
        }
    }


    tick()
    {
        var falling_object = this.falling_objects[this.falling_objects.length-1];
        //console.log(falling_object);
        if(KEYS["ArrowLeft"])
        {
            this.move_left();
        }
        
        if(KEYS["ArrowRight"])
        {
            this.move_right();
        }
        if(KEYS["Space"])
        {
            console.log("space");
            this.game_speed=50;
        }
        else
        {
            this.game_speed=400;
        }

        if(Date.now()-this.last_tick < this.game_speed)
        {
            return;
        } 
        else
        {
            this.last_tick=Date.now();
        }

        if(this.can_move_down(falling_object))
        {
            for(part of falling_object)
            {
                this.logical_map[part.y][part.x].state="blank";
                this.logical_map[part.y][part.x].color="white";

                part.y+=1;
            }
            this.place_block_onto_map(falling_object);
        }
        else
        {
            for(var part of falling_object)
            {
                part.state="steady";                   
            }
            this.new_falling_block();
        }

    }
}