describe("Hola Mundo", function(){

 var msg = 'Hola Mundo';

 it("El mensaje no debe estar vacío", function () {
	expect(msg).not.toBe("");
 })

 it("El mensaje debe ser \"Hola Mundo\"", function () {
	expect(msg).toBe("Hola Mundo");
 });

});