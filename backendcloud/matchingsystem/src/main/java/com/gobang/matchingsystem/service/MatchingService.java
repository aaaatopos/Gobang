package com.gobang.matchingsystem.service;

/**
 * @author xzt
 * @version 1.0
 */
public interface MatchingService {
    String addPlayer(Integer userId, Integer rating, Integer botId);
    String removePlayer(Integer userId);
}
