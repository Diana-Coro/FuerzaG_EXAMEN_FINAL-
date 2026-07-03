package FuerzaG_1.ExamenFinal.service;

import FuerzaG_1.ExamenFinal.model.Afiliado;
import FuerzaG_1.ExamenFinal.repository.AfiliadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AfiliadoService {

    @Autowired
    private AfiliadoRepository afiliadoRepository;

    // CREATE / UPDATE
    public Afiliado save(Afiliado afiliado) {
        return afiliadoRepository.save(afiliado);
    }

    // READ ALL
    public List<Afiliado> findAll() {
        return afiliadoRepository.findAll();
    }

    // READ BY ID
    public Optional<Afiliado> findById(Long id) {
        return afiliadoRepository.findById(id);
    }

    // DELETE
    public void deleteById(Long id) {
        afiliadoRepository.deleteById(id);
    }
}