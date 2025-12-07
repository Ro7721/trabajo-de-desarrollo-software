package epiis.miproyecto.reactspring.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import epiis.miproyecto.reactspring.dto.ProductDto;
import epiis.miproyecto.reactspring.model.Category;
import epiis.miproyecto.reactspring.model.Product;
import epiis.miproyecto.reactspring.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String search) {

        Page<Product> produPage = productService.getProducts(page, size, category, sortBy, search);
        return ResponseEntity.ok(produPage);
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Product>> getFeaturedProduct() {
        return ResponseEntity.ok(productService.getFeaturedProduct());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(productService.getAllCategories());
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countProducts() {
        return ResponseEntity.ok(productService.countProducts());
    }

    @PostMapping("/insert")
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
        return ResponseEntity.ok(productService.createProduct(productDto));
    }

    /*
     * @PutMapping("/update/{id}")
     * public ResponseEntity<Product> updateProduct(@PathVariable String
     * id, @RequestBody ProductDto productDto){
     * return ResponseEntity.ok(productService.updateProduct(id, productDto));
     * }
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String folder = "uploads/";
            Path path = Paths.get(folder);

            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = path.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);
            String imageUrl = "http://localhost:8080/images/" + fileName;
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error al subir la imagen");
        }
    }
}
