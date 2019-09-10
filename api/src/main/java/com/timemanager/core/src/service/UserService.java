package com.timemanager.core.src.service;

import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.timemanager.core.src.dto.GetUserResponseDto;
import com.timemanager.core.src.dto.UserRequestDto;
import com.timemanager.core.src.model.User;
import com.timemanager.core.src.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public static final Pattern pattern = 
        Pattern.compile("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$",
            Pattern.CASE_INSENSITIVE);

    public void createUser(UserRequestDto in) {
        Matcher matcher = pattern.matcher(in.getEmail());

        if (!matcher.matches() || in.getUsername() == null || in.getUsername().isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Incorrect value for mail");     
        } else {
            User user = new User();
            user.setUserID("USR" + UUID.randomUUID().toString());
            user.setEmail(in.getEmail().toLowerCase());
            user.setUsername(in.getUsername());
            userRepository.create(user);
        }
    }

    public GetUserResponseDto getUsers(String email, String userName){
        GetUserResponseDto response = new GetUserResponseDto();

        if (!email.isEmpty() && !userName.isEmpty()) {
            Query query = new Query();
            query.addCriteria(Criteria.where("email").is(email.toLowerCase()).and("username").is(userName));            
            List<User> user = userRepository.find(query);
            if (user.size() == 0) {
                throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "No user found");         
            } else 
                response.setUserID(user.get(0).getUserID());
        } else {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Invalid parameters");     
        }

        return response;
    }

    public User getUserById(String userID) {
        List<User> users = null;

        if (userID.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Invalid parameters");     
        } else {
            Query query = new Query();
            query.addCriteria(Criteria.where("userID").is(userID));            

            users = userRepository.find(query);
        }
        
        if (users == null || users.size() == 0) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "No user found");
        }

        return users.get(0);
    }

    public void updateUser(String userID, User in) {
        Matcher matcher = pattern.matcher(in.getEmail());
        User user = getUserById(userID);

        if (user != null && !matcher.matches() && in.getUsername().isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Invalid parameters");
        } else {
            user.setEmail(in.getEmail());
            user.setUsername(in.getUsername());
            userRepository.update(user);
        }
    }

    public void deleteUser(String userID) {
        User user = getUserById(userID);
        if (user != null) {
            userRepository.delete(user);
        }
    }
}