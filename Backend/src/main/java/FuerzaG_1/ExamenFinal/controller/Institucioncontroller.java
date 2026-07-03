package FuerzaG_1.ExamenFinal.controller;

import FuerzaG_1.ExamenFinal.entity.Institucionentity;
import FuerzaG_1.ExamenFinal.service.Institucionservice;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institucion")
@Tag(name = "Institucion API", description = "CRUD de la tabla Institucion")
public class Institucioncontroller {

    @Autowired
    private Institucionservice institucionservice;

    @Operation(
            summary = "Listar instituciones",
            description = "Obtiene la lista completa de instituciones registradas en el sistema."
    )
    @GetMapping
    public List<Institucionentity> listar() {
        return institucionservice.listar();
    }

    @Operation(
            summary = "Buscar institución por ID",
            description = "Obtiene una institución específica mediante su identificador."
    )
    @GetMapping("/{id}")
    public Institucionentity buscarPorId(@PathVariable Integer id) {
        return institucionservice.buscarPorId(id);
    }

    @Operation(
            summary = "Registrar una institución",
            description = "Permite registrar una nueva institución."
    )
    @PostMapping
    public Institucionentity guardar(

            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Datos de la institución",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "institucion": "Hospital Central",
                                              "referencias": "Av. Principal 123"
                                            }
                                            """
                            )
                    )
            )

            @RequestBody Institucionentity institucion
    ) {
        return institucionservice.guardar(institucion);
    }

    @Operation(
            summary = "Actualizar una institución",
            description = "Actualiza la información de una institución existente."
    )
    @PutMapping("/{id}")
    public Institucionentity actualizar(

            @PathVariable Integer id,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Datos actualizados de la institución",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "institucion": "Hospital Central",
                                              "referencias": "Nueva referencia"
                                            }
                                            """
                            )
                    )
            )

            @RequestBody Institucionentity institucion
    ) {
        return institucionservice.actualizar(id, institucion);
    }

    @Operation(
            summary = "Eliminar una institución",
            description = "Elimina una institución registrada mediante su ID."
    )
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        institucionservice.eliminar(id);
    }
}