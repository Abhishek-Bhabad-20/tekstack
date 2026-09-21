class Appliance {
    constructor(name) {
        this.name = name;
        this.isOn = false;
    }
}


// Custom error
class ApplianceError extends Error {
    constructor(message) {
        super(message);
        this.name = "ApplianceError";
    }
}


// Turn ON appliance
function turnOnAppliance(appliance) {

    try {

        if (appliance.isOn) {
            throw new ApplianceError(
                appliance.name + " is already on"
            );
        }

        appliance.isOn = true;

        return appliance.name + " is turned on";

    } catch (error) {

        return error.message;

    } finally {

        console.log("Operation completed");

    }
}


// Turn OFF appliance
function turnOffAppliance(appliance) {

    try {

        if (!appliance.isOn) {
            throw new ApplianceError(
                appliance.name + " is already off"
            );
        }

        appliance.isOn = false;

        return appliance.name + " is turned off";

    } catch (error) {

        return error.message;

    } finally {

        console.log("Operation completed");

    }
}


// Create appliances
const TV = new Appliance("TV");
const Lamp = new Appliance("Lamp");
const Oven = new Appliance("Oven");


// Given operations
console.log(turnOnAppliance(TV));
console.log(turnOnAppliance(Lamp));
console.log(turnOnAppliance(Oven));

console.log(turnOffAppliance(TV));
console.log(turnOffAppliance(Lamp));
console.log(turnOffAppliance(Oven));


// Trying to turn OFF TV again
console.log(turnOffAppliance(TV));
