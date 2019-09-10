package com.timemanager.core.src.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import com.timemanager.core.src.dto.GetUserResponseDto;
import com.timemanager.core.src.dto.UserRequestDto;
import com.timemanager.core.src.model.User;
import com.timemanager.core.src.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "Users", consumes = MediaType.APPLICATION_JSON_VALUE, tags = "Users")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;
    
    @ApiOperation(value = "Get all user which match username and email" )
    @RequestMapping(method = RequestMethod.GET, params = { "email", "username" })
    public GetUserResponseDto getUsers(
        @RequestParam(name = "email", required = true) String email,
        @RequestParam(name = "username", required = true) String userName) {
        
        return userService.getUsers(email, userName);
    }

    @ApiOperation(value = "Get user by userID")
    @RequestMapping(method = RequestMethod.GET, value = "/{userID}")
    public User getUser(
        @PathVariable("userID") String userID) {

        return userService.getUserById(userID);
    }

    @ApiOperation(value = "Create a new user")
    @RequestMapping(method = RequestMethod.POST)
    public void createUser(@RequestBody UserRequestDto user ) {
        userService.createUser(user);
    }

    @ApiOperation(value = "Update user")
    @RequestMapping(method = RequestMethod.PUT, value = "/{userID}")
    public void updateUser(
        @PathVariable(name = "userID", required = true) String userID,
        @RequestBody User user ) {
            userService.updateUser(userID, user);
    }

    @ApiOperation(value = "Delete user")
    @RequestMapping(method = RequestMethod.DELETE, value = "/{userID}")
    public void deleteUser(
        @PathVariable(name = "userID", required = true) String userID) {
            userService.deleteUser(userID);
    }
}