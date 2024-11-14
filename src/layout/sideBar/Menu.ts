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
    new SideBarMenu("aboutMe", "Home", "fa fa-home", "/"),
    new SideBarMenu("demo", "Demo", "fa fa-laptop", "/demo"),
    new SideBarMenu("analyze", "Analyze", "fa fa-pie-chart", "/analyze"),
    new SideBarMenu("whackAMole", "Whack A Mole", "fa fa-gamepad", "/whack-a-mole"),
]
