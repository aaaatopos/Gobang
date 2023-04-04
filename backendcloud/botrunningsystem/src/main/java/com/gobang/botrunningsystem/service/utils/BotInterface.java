package com.gobang.botrunningsystem.service.utils;

import java.util.List;

/**
 * @author xzt
 * @version 1.0
 */
public interface BotInterface {
    List<Integer> nextMove(String input);
}
