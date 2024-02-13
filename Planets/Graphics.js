class Graphics 
{
	constructor() 
	{
  }
	
	DrawObjects(planets, drawTail)
	{
		blendMode(ADD);
		for (let i = 0; i < planets.length; i++)
			{
				let p = planets[i];

				// strokeWeight(1);
				noStroke();
				fill(p.c, 200);
				circle(p.pos.x, p.pos.y, 2*p.radius);
				
				if (drawTail){
					strokeWeight(0.8);
					stroke(p.c);
					noFill();
					beginShape();
					for (let j = 0; j < p.tail.length; j++)
					{
						vertex(p.tail[j].x, p.tail[j].y);
					}
					endShape();
				}
				
			}
			blendMode(BLEND);
	}
}