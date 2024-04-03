class Graphics
{
	constructor()
	{
		
	}
	
	DrawObjects(particles, w, h)
	{
		fill(200, 200, 0);
		for(let i = 0; i < particles.length; i++){
			let p = particles[i];
			let x = p.c*w;
			let y = p.r*h;
			rect(x, y, w, h);
		}
		// for(let r = 0; r < state.rows; r++)
		// {
		// 	for(let c = 0; c < state.cols; c++)
		// 	{
				
		// 		if (state.grid[r][c] == 0)
		// 		{
		// 			fill(255);
		// 		}
		// 		else if (state.grid[r][c] == 1)
		// 		{
		// 			fill(200, 200, 0);
		// 		}
				
		// 		let x = c*state.w;
		// 		let y = r*state.h;
		// 		rect(x, y, state.w, state.h);
		// 	}
		// }
	}
}