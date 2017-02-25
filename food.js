function Food(x, y, size)
{
this.x = x;
this.y = y;
this.size = size;
//this.col = color(224, 155, 17);
this.col = color(255, randomInt(0, 255), 0);

this.appeal = this.size * 20;

	this.draw = function()
	{
	stroke(this.col);
	fill(this.col);
	ellipse(this.x, this.y, this.size, this.size);

	//noStroke();
	//noFill();
	//ellipse(this.x, this.y, this.appeal*2, this.appeal*2);

	this.y = lerp(this.y, this.y + 2, .4);
	this.y = constrain(this.y, 0, height - 1);
	}

}
