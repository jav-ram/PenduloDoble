//Variables
//distancias
var d1 = 200;
var d2 = 250;
//masas
var m1 = 0.005;
var m2 = 0.002;
//radios
var r1 = (m1*1000)*8;
var r2 = (m2*1000)*8;
//angulos
var t1 = ;
var t2 = ;


// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    Drag = Matter.MouseConstraint,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create({
  constraintIterations: 5,
  velocityIterations: 10
});

// create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showVelocity: true
        }
    });


// array de objetos
var all = [];



// create mass 1
var mass1 = Bodies.circle(400, 200, r1, {
  mass: m1,
  inverseMass: 1/m1,
  inertia: 0,
  restitution: 0,
  friction: 0,
  frictionAir: 0,
  frictionStatic: 0
});
all.push(mass1);

// create mass 2
var mass2 = Bodies.circle(400, 500, r2, {
  mass: m2,
  inverseMass: 1/m2,
  inertia: Infinity,
  restitution: 0,
  friction: 0,
  frictionAir: 0,
  slop: 1
});
all.push(mass2);

console.log(mass1.velocity);

//create constraint
var barrilla1 = Constraint.create( {
  bodyA: mass1,
  pointB: { x: 400, y: 10},
  length: d1,
  stiffness: 0,
});
all.push(barrilla1);

var barrilla2 = Constraint.create( {
  bodyA: mass1,
  bodyB: mass2,
  length: d2,
  stiffness: 0,
});
all.push(barrilla2);

//mouse
var mouseC = Mouse.create(document.body);
var mConstraint = Drag.create(engine, {
  mouse: mouseC
})
all.push(mConstraint);



// add all of the bodies to the world
World.add(engine.world, all);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
