class TetrisWorld
{
    constructor(width, height)
    {       
        this.width = width;
        this.height = height;
        this.logical_map = [];
        this.falling_objects = [];
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
            console.log(el);
            if(this.logical_map[el.y][el.x].state!="blank")
            {
                /// todo gameover
            } 
            else
            {
                this.logical_map[el.y][el.x].state=el.state;
                this.logical_map[el.y][el.x].color=el.color;
            }
        }
    }

    new_falling_block(color="red", shape="square")
    {
        if(shape=='square')
        {
            var partblock_1 = {color:color, state:"moving down", x: 5, y: 0};
            var partblock_2 = {color:color, state:"moving down", x: 6, y: 0};
            var partblock_3 = {color:color, state:"moving down", x: 5, y: 1};
            var partblock_4 = {color:color, state:"moving down", x: 6, y: 1};
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
        console.log(part, whole);
        for(const el of whole)
        {
            console.log(el, part);
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

    tick()
    {
        var falling_object = this.falling_objects[this.falling_objects.length-1];
        console.log(falling_object);
        if(this.can_move_down(falling_object))
        {
            console.log("can move down");   
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