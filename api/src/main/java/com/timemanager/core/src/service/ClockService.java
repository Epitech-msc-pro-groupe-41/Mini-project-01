package com.timemanager.core.src.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.timemanager.core.src.dto.ClockResponseDto;
import com.timemanager.core.src.model.Clock;
import com.timemanager.core.src.repository.ClockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ClockService {

    @Autowired
    ClockRepository clockRepository;

    @Autowired
    UserService userService;

    public String dateLongToString(long dateTime) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(dateTime);
        return formatter.format(date);
    }

    public List<ClockResponseDto> getClock(String userID) {
        List<Clock> clocks= null;
        List<ClockResponseDto> response= new ArrayList<>();

        if (userID.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Invalid parameters");     
        } else {
            if (userService.getUserById(userID) != null) {
                Query query = new Query();
                query.addCriteria(Criteria.where("userId").is(userID));            
                clocks = clockRepository.find(query);
                
            }
            if (clocks == null) {
                throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "No clock found");       
            } 
            for (Clock clock : clocks) {
                ClockResponseDto res = new ClockResponseDto();
                res.setClockID(clock.getClockID());
                res.setStatus(clock.isStatus());
                res.setTime(dateLongToString(clock.getTime()));
                res.setUserId(clock.getUserId());
                response.add(res);
            }
        }
        return response;
    }

    public Clock createClock(String userID) {
        Clock clock = null;
        if (userID.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Invalid parameters");     
        } else {
            if (userService.getUserById(userID) != null) {
                clock =  new Clock();
                clock.setClockID("CLK" + UUID.randomUUID().toString());
                clock.setStatus(true);
                clock.setTime(System.currentTimeMillis());
                clock.setUserId(userID);
                clockRepository.create(clock);
            }
        }
        return clock;
    }
}