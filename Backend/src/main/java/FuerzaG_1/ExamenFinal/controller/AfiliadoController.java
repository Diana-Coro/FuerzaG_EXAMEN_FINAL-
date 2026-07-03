package FuerzaG_1.ExamenFinal.controller;

import FuerzaG_1.ExamenFinal.model.Afiliado;
import FuerzaG_1.ExamenFinal.service.AfiliadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/afiliados")
@CrossOrigin(origins = "*") 
public class AfiliadoController {

    @Autowired
    private AfiliadoService afiliadoService;

    @PostMapping
    public ResponseEntity<Afiliado> createAfiliado(@RequestBody Afiliado afiliado) {
        Afiliado nuevoAfiliado = afiliadoService.save(afiliado);
        return new ResponseEntity<>(nuevoAfiliado, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Afiliado> getAllAfiliados() {
        return afiliadoService.findAll();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Afiliado> getAfiliadoById(@PathVariable Long id) {
        return afiliadoService.findById(id)
                .map(afiliado -> new ResponseEntity<>(afiliado, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    
    @PutMapping("/{id}")
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
    public ResponseEntity<Void> deleteAfiliado(@PathVariable Long id) {
        if (afiliadoService.findById(id).isPresent()) {
            afiliadoService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}