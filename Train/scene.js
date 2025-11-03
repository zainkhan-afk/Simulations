class Scene{
	constructor(){
        this.backgroundHills = new BackgroundHills();
    }
    Render()
    {
        this.backgroundHills.Render();
    }

    Step(){
        this.backgroundHills.Step();
    }
}