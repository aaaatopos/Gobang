package com.gobang.backend.service.pk;

/**
 * @author xzt
 * @version 1.0
 */
public interface PkService {
    String startGame(Integer aId, Integer aBotId, Integer bId, Integer bBotId);

    String receiveBotMove(int userId, int nextStepX, int nextStepY);
}
