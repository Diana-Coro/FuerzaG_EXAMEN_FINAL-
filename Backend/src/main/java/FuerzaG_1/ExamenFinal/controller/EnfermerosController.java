package FuerzaG_1.ExamenFinal.controller;

import FuerzaG_1.ExamenFinal.entity.EnfermerosEntity;
import FuerzaG_1.ExamenFinal.service.EnfermerosService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enfermeros")
@Tag(name = "Enfermeros API", description = "CRUD de la tabla Enfermeros")
public class EnfermerosController {

    private final EnfermerosService service;

    public EnfermerosController(EnfermerosService service) {
        this.service = service;
    }

    @Operation(summary = "Listar enfermeros")
    @ApiResponse(
            responseCode = "200",
            description = "Lista de enfermeros",
            content = @Content(
                    examples = {
                            @ExampleObject(
                                    name = "Ejemplo 1",
                                    value = """
                                [
                                   {
                                      "id": 1,
                                      "nombre": "Lic. Eliana Torrico",
                                      "fechaIngreso": "2022-03-15",
                                      "area": "Pediatría",
                                      "celular": "71234567"
                                   },
                                   {
                                      "id": 2,
                                      "nombre": "Marcos Vargas",
                                      "fechaIngreso": "2024-01-10",
                                      "area": "Urgencias",
                                      "celular": "68765432"
                                   }
                                ]
                                """
                            )
                    }
            )
    )
    @GetMapping
    public List<EnfermerosEntity> listar() {
        return service.listar();
    }

    @Operation(summary = "Buscar enfermero por ID")
    @GetMapping("/{id}")
    public Optional<EnfermerosEntity> buscar(@PathVariable Integer id) {
        return service.buscar(id);
    }

    @Operation(summary = "Insertar enfermero")
    @PostMapping
    public EnfermerosEntity guardar(@RequestBody EnfermerosEntity enfermero) {
        return service.guardar(enfermero);
    }

    @Operation(summary = "Actualizar enfermero")
    @PutMapping("/{id}")
    public EnfermerosEntity actualizar(@PathVariable Integer id, @RequestBody EnfermerosEntity nuevo) {

        EnfermerosEntity enfermero = service.buscar(id).orElse(null);

        if (enfermero != null) {
            enfermero.setNombre(nuevo.getNombre());
            enfermero.setFechaIngreso(nuevo.getFechaIngreso());
            enfermero.setArea(nuevo.getArea());
            enfermero.setCelular(nuevo.getCellular());

            return service.guardar(enfermero);
        }

        return null;
    }

    @Operation(summary = "Eliminar enfermero")
    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Integer id) {

        service.eliminar(id);

        return "Enfermero eliminado";
    }
}
