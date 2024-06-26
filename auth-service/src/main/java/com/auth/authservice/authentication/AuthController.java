package com.auth.authservice.authentication;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String,String>> registerUser(@Validated @RequestBody AuthModel authModel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(authModel));
        
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> loginUser(@RequestBody Map<String,String> data) {
        return ResponseEntity.ok(authService.loginUser(data.get("email"), data.get("password")));
       
    }
    @GetMapping("/user/{email}")
    public ResponseEntity<Map<String,String>> getUserId(@PathVariable String email) {
        return ResponseEntity.ok(authService.getUserId(email));
    }

    @GetMapping("/user/sid/{sid}")
    public ResponseEntity<Map<String,String>> getUserById(@PathVariable UUID sid) {
        return ResponseEntity.ok(authService.getUserById(sid));
    }

    
}
