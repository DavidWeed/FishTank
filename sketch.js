var school = [];
var meal = [];

var LR = 1;

inRange = function(num, min, max)
{
    return num >= min && num <= max;
};

randomInt = function(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

randomColor = function()
{
	return color(randomInt(0, 255), randomInt(0, 255), randomInt(0, 255));
};

function setup()
{
    createCanvas(windowWidth, windowHeight);

	for (var j = 0; j < 10; j++)
	{
		var fishSize = randomInt(10,20);
		school.push(new Fish(randomInt(20, width - 40), randomInt(20, height - 40), fishSize, randomInt(1,2), randomColor()));
	}
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed()
{
    if (inRange(mouseX, windowWidth - 200, windowWidth) & inRange(mouseY, windowHeight - 100, windowHeight))
    {
        meal.push(new Food(randomInt(20, width - 20), 0, 5));
    }
    else
    {
        school.push(new Fish(mouseX, mouseY, randomInt(10, 20), randomInt(1,2), randomColor()));
    }
}

function keyPressed()
{
	if (key == 'f' || key == 'F')
	{
        meal.push(new Food(randomInt(20, width - 20), 0, 5));
	}
}

function draw()
{
background('#282c34');

	for (var f = meal.length - 1; f >= 0; f--)
	{
        meal[f].draw();
		for (var i = school.length - 1; i >= 0; i--)
		{
			if (school[i].huntable(meal[f].x, meal[f].y, meal[f].appeal))
			{
				school[i].hunting = true;
				//console.log("hunting");
				school[i].prey.x = meal[f].x;
				school[i].prey.y = meal[f].y;

                if (dist(meal[f].x, meal[f].y, school[i].x, school[i].y) <= 10)
			    {
                    school[i].eat(meal[f].size);
			     	meal.splice(f, 1);
			    	//console.log("Food eaten");
			    	school[i].hunting = false;
			    	break;
			    }
            }
		}
	}

	for (var i = school.length - 1; i >= 0; i--)
	{
		school[i].swim();
		if (school[i].x >= width + 50)
		{
			school[i].dir = 2;
		}
		else if(school[i].x <= -50)
		{
			school[i].dir = 1;
		}
		school[i].hunting = false;
	}
    
    fill(0);
    rect( windowWidth - 200, windowHeight - 100, 200, 100);   
    textSize(65);
    fill(255);
    text("Food", windowWidth - 180, windowHeight - 80 , windowWidth - 20, windowHeight - 20);
}
