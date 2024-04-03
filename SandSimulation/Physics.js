class Physics
{
	constructor(){
		
	}
	
	Step(particles, state){
		let updated_state = new State(state.rows, state.cols, state.w, state.h);
		updated_state.EmptyGrid();
		for (let i = 0; i < particles.length; i++){
			let p = particles[i];
			
			if (p.r < state.rows-1) {
				let rowInc = 0;
				let colInc = 0;
				if (state.grid[p.r + 1][p.c] == 0) {
					rowInc = 1;
				}
				else {
					let rightEmpty = false;
					let leftEmpty = false;
					
					if (p.c > 0 && p.c < state.cols - 1) {
						rightEmpty = state.grid[p.r + 1][p.c + 1] == 0;
						leftEmpty = state.grid[p.r + 1][p.c - 1] == 0;
					}
					
					else if (p.c == state.cols - 1) {
						leftEmpty = state.grid[p.r + 1][p.c - 1] == 0;
					}
					
					else {
						rightEmpty = state.grid[p.r + 1][p.c + 1] == 0;
					}
					
					if (leftEmpty && rightEmpty) {
						rowInc = 1;
						if (random() > 0.5) {
							colInc = -1;
						}
						else {
							colInc = 1;							
						}
					}
					else if(leftEmpty) { // Left Empty
						rowInc = 1;
						colInc = -1;
					}
					else if(rightEmpty) { // Right Empty
						rowInc = 1;
						colInc = 1;
					}
				}
				
				// print("\n\n");
				// print(rowInc, colInc);
				
				p.r += rowInc;
				p.c += colInc;
			}
			updated_state.SetValue(p.r, p.c);
			
		}
		return updated_state;
	}
}