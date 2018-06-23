import { G } from "../G";

const { ccclass, property } = cc._decorator;

@ccclass
export class HallScene extends cc.Component {
    onBtnClick (event){
        G.enterScene(event.currentTarget.name);
    }
}
