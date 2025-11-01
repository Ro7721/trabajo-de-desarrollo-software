package com.proyecto.sistemaVenta.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.Locale.Category;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.sistemaVenta.models.dto.ProductoDto;
import com.proyecto.sistemaVenta.models.entity.Producto;
import com.proyecto.sistemaVenta.repositories.ProductoRepository;

import jakarta.transaction.Transactional;
@Service
public class ProductoServices {
    @Autowired
    private ProductoRepository repository;
    public ProductoServices(ProductoRepository productoRepository){
        this.repository = productoRepository;
    }
    //Metodo para mapear producto a productoDto
    public ProductoDto mapToDto(Producto producto){ 
        
        ProductoDto dto  = new ProductoDto();
        if(producto.getIdProducto() == null || producto.getIdProducto().isEmpty()){
            dto.setIdProducto(UUID.randomUUID().toString());
        }
        dto.setDescription(producto.getDescription());
        dto.setUnidad(producto.getUnidad());
        dto.setStockAviable(producto.getStockAviable());
        dto.setCategory(producto.getCategory() != null ? producto.getCategory().name() : null);
        // Cannot map a String (stored filename) back to a MultipartFile here; leave DTO file image null
        dto.setFileImage(null);
        dto.setPurchesePrice(producto.getPurchesePrice());
        dto.setSalePrice(producto.getSalePrice());
        dto.setUnitPrice(producto.getUnitPrice());
        dto.setUpdatedAt(producto.getUpdatedAt() != null ? producto.getUpdatedAt() : LocalDate.now());
        return dto;
    }
    //metodo para mapear UsuarioDto a Usuario(Entity)
    public Producto mapToEntity(ProductoDto productoDto){
        Producto producto = new Producto();
        return updateEntityFromProducto(producto, productoDto);
    }
    // Metodo para actualizar la entidad desde Dto
    public Producto updateEntityFromProducto(Producto producto, ProductoDto dto){
        producto.setIdProducto(dto.getIdProducto());
        producto.setDescription(dto.getDescription());
        producto.setUnidad(dto.getUnidad());
        producto.setStockAviable(dto.getStockAviable());
        
        // Convertir String a Enum
        if(dto.getCategory() != null){
            producto.setCategory(Producto.Categoria.valueOf(dto.getCategory()));
        }
        // Store the uploaded MultipartFile's original filename into the entity (or null if no file provided)
        producto.setFileImage(dto.getFileImage() != null ? dto.getFileImage().getOriginalFilename() : null);
        producto.setPurchesePrice(dto.getPurchesePrice());
        producto.setSalePrice(dto.getSalePrice());
        producto.setUnitPrice(dto.getUnitPrice());
        producto.setUpdatedAt(LocalDate.now()); // Fecha actual
        producto.setUpdatedAt(LocalDate.now()); // Fecha actual


        return producto;
    }
    //algunas validaciones
    public void validateProductoDto(ProductoDto productoDto, String idProduct){
        
        if(productoDto.getIdProducto() == null || productoDto.getIdProducto().isEmpty()){
            throw new IllegalArgumentException("El ID producto esta vacio");
        }

        if(repository.existsById(idProduct)){
            throw new RuntimeException("El ID  de producto "+ idProduct+ "ya existe");
        }
        if(productoDto.getStockAviable() < 0){
            throw new  IllegalArgumentException("El stock no puede ser vacio");
        }
        if(productoDto.getSalePrice() <= 0){
            throw new IllegalArgumentException("El precio de venta de ser mayor a 0");
        }
        if(productoDto.getPurchesePrice() < 0){
            throw new IllegalArgumentException("El precio de compra es nesesario");
        }
    }
    // metodo para crear Producto
    @Transactional
    public void createProduct(ProductoDto productoDto){

        validateProductoDto(productoDto, null);
        Producto producto = mapToEntity(productoDto);
        repository.save(producto);
    }
    // Eliminar producto
    public void deleteProdcuto(String id ){
        if(!repository.existsById(id)){
            throw new RuntimeException("Producto no encontrado con el ID "+ id);
        }
        repository.deleteById(id);
    }
    //Metodo para listar Usuarios 
    @Transactional
    public List<ProductoDto> getAllProducts(){
        return repository.findAll()
            .stream()
            .map(this :: mapToDto)
            .collect(Collectors.toList());
    }

    //metodo para actualizar producto
    public void updateProduct(String id, ProductoDto dto){
        Producto exiProducto = repository.findById(id)
        .orElseThrow(()-> new RuntimeException("Producto no encotrado con ID"+ id));

        validateProductoDto(dto, id);
        updateEntityFromProducto(exiProducto, dto);
        exiProducto.setUpdatedAt(LocalDate.now());
        repository.save(exiProducto);
    }
    // Metodo para filtrar por Decripcion parcial(LIKE)
    public List<ProductoDto> searchByDescription(String description){
        return repository.searchByDescription(description)
            .stream()
            .map(this:: mapToDto)
            .toList();
    }
    // Buscar producto por descripcion(exacta)
    public List<ProductoDto> getByDescription(String descripción){
        return repository.findByDescription(descripción)
            .stream()
            .map(this::mapToDto)
            .toList();
    }

    // Filtrar por categoaria
    public List<ProductoDto> getByCategory(Category category){
        return repository.findByCategory(category)
            .stream()
            .map(this::mapToDto)
            .toList();
    }
    //metodo para obtner categorias
    public Producto.Categoria[] getCategoriasDisponibles(){
        return Producto.Categoria.values();
    }
}
