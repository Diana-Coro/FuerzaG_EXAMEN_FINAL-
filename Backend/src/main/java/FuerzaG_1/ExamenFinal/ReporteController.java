package FuerzaG_1.ExamenFinal;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    private final ReporteService service;

    public ReporteController(ReporteService service) {
        this.service = service;
    }

    // LISTAR
    @GetMapping
    public List<Reporte> listar() {
        return service.listar();
    }

    // GUARDAR
    @PostMapping
    public Reporte guardar(@RequestBody Reporte reporte) {
        return service.guardar(reporte);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Reporte actualizar(@PathVariable Long id, @RequestBody Reporte reporte) {
        return service.actualizar(id, reporte);
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}