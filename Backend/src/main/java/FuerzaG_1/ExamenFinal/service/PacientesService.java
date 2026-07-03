package FuerzaG_1.ExamenFinal.Service;
import FuerzaG_1.ExamenFinal.Entity.PacientesEntity;
import FuerzaG_1.ExamenFinal.Repository.PacientesRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class PacientesService {

    private final PacientesRepository repository;

    public PacientesService(PacientesRepository repository) {
        this.repository = repository;
    }

    public List<PacientesEntity> listar() {
        return repository.findAll();
    }

    public Optional<PacientesEntity> buscar(Integer id) {
        return repository.findById(id);
    }

    public PacientesEntity guardar(PacientesEntity paciente) {
        return repository.save(paciente);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
}
