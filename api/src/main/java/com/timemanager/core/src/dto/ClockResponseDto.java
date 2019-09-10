package com.timemanager.core.src.dto;

public class ClockResponseDto {

    String clockID;

    String time;

    Boolean status;

    String userId;

    public String getClockID() {
        return clockID;
    }

    public void setClockID(String clockID) {
        this.clockID = clockID;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    
}