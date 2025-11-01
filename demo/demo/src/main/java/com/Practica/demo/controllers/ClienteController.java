package com.Practica.demo.controllers;

import java.util.Optional;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.Practica.demo.models.Cliente;
import com.Practica.demo.models.ClienteDto;
import com.Practica.demo.services.ClienteRepository;

import org.springframework.ui.Model;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/clientes")
public class ClienteController {
    @Autowired
    private ClienteRepository clienteRepository;
    
    @GetMapping({"", "/"})
    public String listarClientes(Model model){
        List<Cliente> clientes = clienteRepository.findAll(Sort.by(Sort.Direction.DESC, "fechaRegistro"));
        model.addAttribute("clientes", clientes);
        model.addAttribute("totalClientes", clienteRepository.count());
        return "clientes/index";
    }
    //Mostrar fromulario de creacion
    @GetMapping("/create")
    public String mostrarFormularioCreacion(Model model){
        ClienteDto clienteDto = new ClienteDto();
        model.addAttribute("clienteDto", clienteDto);
        return "clientes/crearCliente";
    }
    // Procesar formulario de creación
    @PostMapping("/create")
    public String crearCliente(@Valid @ModelAttribute("clienteDto") ClienteDto clienteDto, 
                               BindingResult result, 
                               Model model) {
        // validar si el email existe
        if(clienteRepository.findByEmail(clienteDto.getEmail()).isPresent()){
            result.rejectValue("email", "error.clienteDto", "El email ya esta registrado");
        }  
        //validar si el DNI ya existe
        if(clienteDto.getDni() != null && !clienteDto.getDni().isEmpty() && clienteRepository.findByDni(clienteDto.getDni()).isPresent()){
            result.rejectValue("dni", "error.clientDto", "El DNI ya esta registrado");
        }

        if (result.hasErrors()) {
            model.addAttribute("clienteDto", clienteDto);
            return "clientes/crearCliente";
        }

        Cliente cliente = new Cliente();
        cliente.setNombre(clienteDto.getNombre());
        cliente.setApellido(clienteDto.getApellido());
        cliente.setEmail(clienteDto.getEmail());
        cliente.setTelefono(clienteDto.getTelefono());
        cliente.setDireccion(clienteDto.getDireccion());
        cliente.setDni(clienteDto.getDni());

        clienteRepository.save(cliente);
        return "redirect:/clientes?success=Cliente+creado+correctamente";
    }

    // Mostrar formulario de edición
    @GetMapping("/edit/{id}")
    public String mostrarFormularioEdicion(@PathVariable("id") Long id, Model model) {
        try {
            Optional<Cliente> clienteOpt = clienteRepository.findById(id);
            if (clienteOpt.isPresent()) {
                Cliente cliente = clienteOpt.get();
                ClienteDto clienteDto = new ClienteDto();

                clienteDto.setNombre(cliente.getNombre());
                clienteDto.setApellido(cliente.getApellido());
                clienteDto.setEmail(cliente.getEmail());
                clienteDto.setTelefono(cliente.getTelefono());
                clienteDto.setDireccion(cliente.getDireccion());
                clienteDto.setDni(cliente.getDni());

                model.addAttribute("clienteDto", clienteDto);
                model.addAttribute("clienteId", id);
                model.addAttribute("emailOriginal", cliente.getEmail());
                model.addAttribute("dniOriginal", cliente.getDni());
                return "clientes/editarCliente";
            } else {
                return "redirect:/clientes?error=Cliente+no+encontrado";
            }
        } catch (Exception e) {
            return "redirect:/clientes?error=Error+al+cargar+cliente";
        }
    }

    // Procesar formulario de edición
    @PostMapping("/edit/{id}")
    public String actualizarCliente(@PathVariable("id") Long id,
                                    @Valid @ModelAttribute("clienteDto") ClienteDto clienteDto,
                                    BindingResult result,
                                    Model model,
                                    @ModelAttribute("emailOriginal") String emailOriginal,
                                    @ModelAttribute("dniOriginal") String dniOriginal) {
        // Validar si el email ya existe (excluyendo el actual)
        if (!clienteDto.getEmail().equals(emailOriginal) && 
            clienteRepository.findByEmail(clienteDto.getEmail()).isPresent()) {
            result.rejectValue("email", "error.clienteDto", "El email ya está registrado");
        }
        
        // Validar si el DNI ya existe (excluyendo el actual)
        if (clienteDto.getDni() != null && !clienteDto.getDni().isEmpty() && 
            !clienteDto.getDni().equals(dniOriginal) && 
            clienteRepository.findByDni(clienteDto.getDni()).isPresent()) {
            result.rejectValue("dni", "error.clienteDto", "El DNI ya está registrado");
        }                                
        if (result.hasErrors()) {
            model.addAttribute("clienteDto", clienteDto);
            model.addAttribute("clienteId", id);
            model.addAttribute("emailOriginal", emailOriginal);
            model.addAttribute("dniOriginal", dniOriginal);
            return "clientes/editarCliente";
        }

        try {
            Optional<Cliente> clienteOpt = clienteRepository.findById(id);
            if (clienteOpt.isPresent()) {
                Cliente cliente = clienteOpt.get();

                cliente.setNombre(clienteDto.getNombre());
                cliente.setApellido(clienteDto.getApellido());
                cliente.setEmail(clienteDto.getEmail());
                cliente.setTelefono(clienteDto.getTelefono());
                cliente.setDireccion(clienteDto.getDireccion());
                cliente.setDni(clienteDto.getDni());

                clienteRepository.save(cliente);
                return "redirect:/clientes?success=Cliente+actualizado+correctamente";
            } else {
                return "redirect:/clientes?error=Cliente+no+encontrado";
            }
        } catch (Exception e) {
            return "redirect:/clientes?error=Error+al+actualizar+cliente";
        }
    }

    // Eliminar cliente
    @GetMapping("/delete/{id}")
    public String eliminarCliente(@PathVariable("id") Long id) {
        try {
            Optional<Cliente> clienteOpt = clienteRepository.findById(id);
            if (clienteOpt.isPresent()) {
                clienteRepository.deleteById(id);
                return "redirect:/clientes?success=Cliente+eliminado+correctamente";
            } else {
                return "redirect:/clientes?error=Cliente+no+encontrado";
            }
        } catch (Exception e) {
            return "redirect:/clientes?error=Error+al+eliminar+cliente";
        }
    }
    // BUSCAR  clientes
    @GetMapping("/search")
    public String buscarClientes(@RequestParam("q") String query, Model model) {
        List<Cliente> clientes = clienteRepository
            .findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(query, query);
        //buscar por dni
        
        model.addAttribute("clientes", clientes);
        model.addAttribute("query", query);
        return "clientes/index";
    }

}
