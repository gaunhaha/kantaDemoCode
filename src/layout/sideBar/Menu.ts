export class SideBarMenu {
    name: string;
    displayName: string;
    icon: string;
    path: string;
    constructor(name: string, displayName: string, icon: string, path: string) {
        this.name = name;
        this.displayName = displayName;
        this.icon = icon;
        this.path = path;
    }
}

export const sideBarMenus = [
    new SideBarMenu("home", "home", "fa fa-home", "/"),
    new SideBarMenu("skill", "skill", "fa-solid fa-wrench", "/skill"),
    new SideBarMenu("analysis", "analysis", "fa fa-pie-chart", "/analysis"),
    new SideBarMenu("whackAMole", "whackAMole", "fa fa-gamepad", "/whack-a-mole"),
    new SideBarMenu("mazeGame", "mazeGame", "fa fa-star", "/maze-game"),
]
