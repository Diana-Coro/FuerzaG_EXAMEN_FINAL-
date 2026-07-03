package FuerzaG_1.ExamenFinal.controller;

import FuerzaG_1.ExamenFinal.model.Afiliado;
import FuerzaG_1.ExamenFinal.service.AfiliadoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/afiliados")
@CrossOrigin(origins = "*")
@Tag(name = "Afiliado Controlador", description = "Endpoints para la gestión completa de afiliados")
public class AfiliadoController {

    @Autowired
    private AfiliadoService afiliadoService;

    @PostMapping
    @Operation(summary = "Registrar un nuevo afiliado", description = "Crea un afiliado en el sistema con su nombre, tipo y fecha/hora correspondientes.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Afiliado creado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Solicitud inválida o datos incorrectos")
    })
    public ResponseEntity<Afiliado> createAfiliado(@RequestBody Afiliado afiliado) {
        Afiliado nuevoAfiliado = afiliadoService.save(afiliado);
        return new ResponseEntity<>(nuevoAfiliado, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Obtener lista de afiliados", description = "Recupera todos los registros de los afiliados almacenados en la base de datos.")
    @ApiResponse(responseCode = "200", description = "Lista obtenida con éxito")
    public List<Afiliado> getAllAfiliados() {
        return afiliadoService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar afiliado por ID", description = "Obtiene los detalles de un afiliado específico pasando su identificador numérico.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Afiliado encontrado"),
        @ApiResponse(responseCode = "404", description = "No se encontró ningún afiliado con el ID proporcionado")
    })
    public ResponseEntity<Afiliado> getAfiliadoById(@PathVariable Long id) {
        return afiliadoService.findById(id)
                .map(afiliado -> new ResponseEntity<>(afiliado, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un afiliado", description = "Actualiza los datos de un afiliado existente.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Afiliado actualizado exitosamente"),
        @ApiResponse(responseCode = "404", description = "No se encontró el afiliado")
    })
    public ResponseEntity<Afiliado> updateAfiliado(@PathVariable Long id, @RequestBody Afiliado detallesAfiliado) {
        return afiliadoService.findById(id)
                .map(afiliadoExistente -> {
                    afiliadoExistente.setNombre(detallesAfiliado.getNombre());
                    afiliadoExistente.setTipoAfiliado(detallesAfiliado.getTipoAfiliado());
                    afiliadoExistente.setFechaHora(detallesAfiliado.getFechaHora());
                    Afiliado actualizado = afiliadoService.save(afiliadoExistente);
                    return new ResponseEntity<>(actualizado, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar afiliado por ID", description = "Elimina un afiliado existente usando su identificador.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Afiliado eliminado"),
        @ApiResponse(responseCode = "404", description = "Afiliado no encontrado")
    })
    public ResponseEntity<Void> deleteAfiliado(@PathVariable Long id) {
        return afiliadoService.findById(id)
                .map(afiliado -> {
                    afiliadoService.deleteById(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}