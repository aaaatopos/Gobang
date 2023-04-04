package com.gobang.botrunningsystem.service.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @author xzt
 * @version 1.0
 */
public class Bot implements BotInterface {
    @Override
    public List<Integer> nextMove(String input) {
        List<Integer> res = new ArrayList<>();
        Random random = new Random();
        res.add(random.nextInt(15));
        res.add(random.nextInt(15));
        return res;
    }
}
