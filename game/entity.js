function Entity() {
    this.x = 0;
    this.y = 0;

    // Dimensions
    this.width = 0;
    this.height = 0;

    // All entities can have speed and direction
    this.xVelocity = 0;
    this.yVelocity = 0;
}


Entity.prototype.update = function () {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
}

// Returns true if the entity intersects the given entity
Entity.prototype.intersect = function(other) {
    return this.y + this.height > other.y
        && this.y < other.y + other.height
        && this.x + this.width > other.x
        && this.x < other.x + other.width;
}
