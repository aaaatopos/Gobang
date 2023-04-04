package com.gobang.botrunningsystem.service.impl;

import com.gobang.botrunningsystem.service.BotRunningService;
import com.gobang.botrunningsystem.service.impl.utils.BotPool;
import org.springframework.stereotype.Service;

/**
 * @author xzt
 * @version 1.0
 */
@Service
public class BotRunningServiceImpl implements BotRunningService {
    public final static BotPool botPool = new BotPool();
    @Override
    public String addBot(Integer userId, String botCode, String input) {
        System.out.println("add Bot: " + userId + " " + botCode + " " + input);
        botPool.addBot(userId, botCode, input);
        return "add Bot success";
    }
}
