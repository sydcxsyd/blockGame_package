if (!CC_EDITOR) {
    cc.director.setClearColor( cc.hexToColor('#2f69d2') );
}
cc.director.getPhysicsManager().enabled = true;

// cc.director.getPhysicsManager().debugDrawFlags = 
//     cc.PhysicsManager.DrawBits.e_jointBit |
//     cc.PhysicsManager.DrawBits.e_shapeBit;

let manager = cc.director.getCollisionManager();
// manager.enabled = true;
// manager.enabledDrawBoundingBox = true;
