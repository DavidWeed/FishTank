function Fish(x, y, size, dir, color)
{
this.x = x;
this.y = y;
this.size = size;

this.dir = dir;

this.stomach = size;
this.hunger = 0;

this.hunting = false;
this.prey = {x:0, y:0};
//this.j = x;


//this.col = color(0, 195/this.size, 0);

this.col = color;


	this.drawRight = function()
	{
		this.dir = 1;
		stroke(this.col);
		fill(this.col);
		this.size2 = this.size + this.size / 2;
		this.size3 = this.size/2;
		ellipse(this.x, this.y, this.size2, this.size);
		triangle(this.x - this.size3, this.y, this.x - this.size2, this.y - this.size2/2,
			this.x - this.size2, this.y + this.size2/2);
	};

	this.drawLeft = function()
	{
		this.dir = 2;
		stroke(this.col);
		fill(this.col);
		this.size2 = this.size + this.size / 2;
		this.size3 = this.size/2;
		ellipse(this.x, this.y, this.size2, this.size);
		triangle(this.x + this.size3, this.y, this.x + this.size2, this.y + this.size2/2,
			this.x + this.size2, this.y - this.size2/2);
	};

	this.swimLeft = function()
	{
		this.x = this.x - 10/this.size;
		this.y = this.y + (noise(this.x, this.y) - .5) * 2;
		this.y = constrain(this.y, 20, height - 5);
	};

	this.swimRight = function()
	{
		this.x = this.x + 10/this.size;
		this.y = this.y + (noise(this.x, this.y) - .5) * 2;
		this.y = constrain(this.y, 20, height - 5);
	};

	this.swim = function()
	{
		if (this.hunting == false)
		{
			if (this.dir == 1)
			{
				this.swimRight();
				this.drawRight();
			}
			else if (this.dir == 2)
			{
				this.swimLeft();
				this.drawLeft();
			}
		}
		else
		{
		this.hunt(this.prey.x, this.prey.y);
		}
	};

    
	this.hunt = function(x, y)
	{
		if (y > this.y)
		{
			this.y += 15/this.size;
		}
		else if (y < this.y)
		{
			this.y -= 15/this.size;
		}

		if (x > this.x + this.size3)
		{
			this.x += 15/this.size;
			this.drawRight();
		}
		else if (x < this.x - this.size3)
		{
			this.x -= 15/this.size;
			this.drawLeft();
		}
        
        (this.dir == 1) ? this.drawRight() : this.drawLeft();

		if (dist(x, y, this.x, this.y) <= this.size )
		{
			this.hunting = false;
			this.swim();
		}
	};

    
	this.huntable = function(x, y, appeal)
	{
		if (inRange(this.x, x - appeal, x + appeal) && inRange(this.y, y - appeal, y + appeal))
		{
			//console.log("Collision");
			return true;
		}
		else
		{
			return false;
		}
	}

	this.eat = function(snack)
	{
		this.hunger += snack;

		if (this.hunger >= this.stomach)
		{
			this.size += snack;
			this.hunger = 0;
			this.stomach = this.size * 3;
		}
	}

}
