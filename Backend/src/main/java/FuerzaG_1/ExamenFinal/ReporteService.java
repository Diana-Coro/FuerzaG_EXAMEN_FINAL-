package FuerzaG_1.ExamenFinal;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReporteService {

    private final ReporteRepository repository;

    public ReporteService(ReporteRepository repository) {
        this.repository = repository;
    }

    // LISTAR TODOS
    public List<Reporte> listar() {
        return repository.findAll();
    }

    // GUARDAR
    public Reporte guardar(Reporte reporte) {
        return repository.save(reporte);
    }

    // ELIMINAR
    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    // ACTUALIZAR
    public Reporte actualizar(Long id, Reporte nuevo) {
        Reporte r = repository.findById(id).orElseThrow();

        r.setGastos(nuevo.getGastos());
        r.setMes(nuevo.getMes());
        r.setIngresos(nuevo.getIngresos());
        r.setTipo(nuevo.getTipo());

        return repository.save(r);
    }
}