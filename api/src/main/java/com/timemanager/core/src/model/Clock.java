package com.timemanager.core.src.model;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "timemanager_clocks")
public class Clock {

    @Id
    private String id;

    @Indexed(unique = true)
    private String clockID;

    @NotNull(message = "Time must not be null")
    private long time;

    @NotNull(message = "Status must not be null")
    private boolean status;

    @NotNull(message = "UserId must not be null")
    private String userId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClockID() {
        return clockID;
    }

    public void setClockID(String clockID) {
        this.clockID = clockID;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}