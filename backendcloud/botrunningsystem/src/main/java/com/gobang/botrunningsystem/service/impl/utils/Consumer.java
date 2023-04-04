package com.gobang.botrunningsystem.service.impl.utils;

import com.gobang.botrunningsystem.service.utils.BotInterface;
import org.joor.Reflect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

/**
 * @author xzt
 * @version 1.0
 */
@Component
public class Consumer extends Thread{
    private Bot bot;
    private static RestTemplate restTemplate;
    private final static String receiveBotMoveUrl = "http://127.0.0.1:3000/pk/receive/bot/move/";

    @Autowired
    public void setRestTemplate(RestTemplate restTemplate) {
        Consumer.restTemplate = restTemplate;
    }

    public void startTimeout(int timeout, Bot bot) {
        this.bot = bot;
        this.start();

        try {
            this.join(timeout);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            this.interrupt(); // 中断当前线程
        }
    }

    /**
     * 在code中的Bot类名后面加上uid
     * @param code
     * @param uid
     * @return
     */
    private String addUid(String code, String uid) {
        // indexOf 在code中查找目标字符串
        int k = code.indexOf(" implements com.gobang.botrunningsystem.utils.BotInterface");
        return code.substring(0, k) + uid + code.substring(k);
    }

    @Override
    public void run() {
        UUID uuid = UUID.randomUUID();  // 随机一个字符串
        String uid = uuid.toString().substring(0, 8); // 取前8位

        BotInterface botInterface = Reflect.compile(
                "com.gobang.botrunningsystem.utils.Bot" + uid,
                addUid(bot.getBotCode(), uid)
        ).create().get();

        List<Integer> nextStep = botInterface.nextMove(bot.getInput());

        System.out.println("move-direction: " + bot.getUserId() + " " + nextStep);

        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        data.add("user_id", bot.getUserId().toString());
        data.add("nextStepX", nextStep.get(0).toString());
        data.add("nextStepY", nextStep.get(1).toString());
        restTemplate.postForObject(receiveBotMoveUrl, data, String.class);
    }
}
