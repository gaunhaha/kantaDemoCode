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
    new SideBarMenu("aboutMe", "home", "fa fa-home", "/"),
    new SideBarMenu("demo", "demo", "fa fa-laptop", "/demo"),
    new SideBarMenu("analysis", "analysis", "fa fa-pie-chart", "/analysis"),
    new SideBarMenu("whackAMole", "whackAMole", "fa fa-gamepad", "/whack-a-mole"),
]
