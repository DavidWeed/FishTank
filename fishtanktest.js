addFish = function(school, num)
{
    for (var i = 0; i < num; i++)
    {
        school.push(new Fish(randomInt(20, width - 40), randomInt(20, height - 40),
            randomInt(10, 20), randomInt(1,2), randomColor()));
    }
}

addFood = function(meal, num)
{
    for (var i = 0; i < num; i++) {
        meal.push(new Food(randomInt(20, width - 20), 0, 5));
    }
}
