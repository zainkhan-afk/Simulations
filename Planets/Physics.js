class Physics 
{
	constructor(G) 
	{
		this.G = G;
  }
	
	ApplyPlanetaryForces(planets)
	{
		for (let i = 0; i < planets.length; i++)
		{
			let p1 = planets[i];
			for (let j = 0; j < planets.length; j++)
			{
				if (i != j)
                {
                  let p2 = planets[j];

                  let p21 = p5.Vector.sub(p2.pos, p1.pos);
									let p12 = p5.Vector.sub(p1.pos, p2.pos);
									
									let rSq = p21.magSq();
									let r = p21.mag();
									
                  p12.normalize();
                  p21.normalize();
									
									let newAcc;
									if ( r < min(p1.radius, p2.radius))
									{
											let f = this.G * p1.mass * p2.mass / rSq;
											// newAcc = p5.Vector.setMag(p12, f);
											// newAcc = p5.Vector.setMag(p21, f);
											newAcc = createVector(0, 0);
									}
									else
									{
											let f = this.G * p1.mass * p2.mass / rSq;
											newAcc = p5.Vector.setMag(p21, f);
									}
									
									newAcc.div(p1.mass);
									p1.acc.add(newAcc);
              }
			}
		}
	}
	
	
	Step(planets)
	{
		this.ApplyPlanetaryForces(planets);
		for (let i = 0; i < planets.length; i++)
			{
				let p = planets[i];
				
				p.vel.add(p.acc);
				
// 				if (p.vel.x > p.maxVel.x) {p.vel.x = p.maxVel.x;}
// 				else if (p.vel.x < -p.maxVel.x) {p.vel.x = -p.maxVel.x;}

// 				if (p.vel.y > p.maxVel.y) {p.vel.y = p.maxVel.y;}
// 				else if (p.vel.y < -p.maxVel.y) {p.vel.y = -p.maxVel.y;}		
				
				p.Update();
			}
	}
}